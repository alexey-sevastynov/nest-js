import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { KavappInventory, KavappInventorySnapshotDocument } from "../kavapp-inventory-schema";
import { KavappInventoryService } from "./kavapp-inventory.service";
import { InventoryAlertService } from "./inventory-alert.service";

@Injectable()
export class KavappSyncService {
    private readonly logger = new Logger(KavappSyncService.name);

    constructor(
        @InjectModel(KavappInventory.name)
        private readonly snapshotModel: Model<KavappInventorySnapshotDocument>,
        private readonly kavappInventoryService: KavappInventoryService,
        private readonly inventoryAlertService: InventoryAlertService,
    ) {}

    async sync(pointId?: string, testAlert = false): Promise<KavappInventorySnapshotDocument> {
        const previousSnapshot = await this.getLatestSnapshot();
        const inventory = await this.kavappInventoryService.getCurrentInventory(pointId);

        const snapshot = new this.snapshotModel({
            syncDate: new Date(),
            cup: inventory.cup,
            ingredient: inventory.ingredient,
            product: inventory.product,
            kitchen: inventory.kitchen,
        });

        const saved = await snapshot.save();

        try {
            await this.inventoryAlertService.checkAndNotify(inventory, previousSnapshot, testAlert);
        } catch (alertError) {
            this.logger.error("Failed to run alert checks", alertError);
        }

        return saved;
    }

    async getLatestSnapshot(): Promise<KavappInventorySnapshotDocument | null> {
        return this.snapshotModel.findOne().sort({ syncDate: -1 }).exec();
    }

    async getHistory(limit = 30): Promise<KavappInventorySnapshotDocument[]> {
        return this.snapshotModel.find().sort({ syncDate: -1 }).limit(limit).exec();
    }
}
