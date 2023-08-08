import config from "../db_config/data-source";

 export function getRepositoryEntityInstance(Entity) {
    return config.getRepository(Entity);
 }

export const databaseInit = async () => {
    await config.initialize();
}

/* export class InitAppSource {
    static getRepositoryInstance(Entity) {
        try {
            return config.getRepository(Entity);
        } catch (error) {
            console.log(error);
        }
    }

    static async databaseInit() {
        await config.initialize();
    }
} */