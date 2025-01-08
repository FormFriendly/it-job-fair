export declare namespace iApi {
    type Id = number;

    type oEvent = {
        name: string,
        description?: string,
        id: Id,
        starts_at: string,
        ends_at: string,
        created_at: string,
        updated_at: string,
        img_url?: string,
        img_path?: string,
    }

    type oEvents = Array<oEvent>
}