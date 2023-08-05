import config from "../db_config/data-source";

export class InitAppSource {
    static getRepositoryEntityInstance(Entity) {
        return config.getRepository(Entity);
    }

    static async databaseInit() {
        await config.initialize();
    }
}