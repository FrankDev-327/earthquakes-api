import config from "../db_config/data-source";

 export function getRepositoryEntityInstance(Entity) {
    return config.getRepository(Entity);
 }

export const databaseInit = async () => {
    await config.initialize();
}
