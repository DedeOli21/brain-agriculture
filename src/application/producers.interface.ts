export abstract class IProducerRepository {
    findProducerByDocument: (document: string) => Promise<any>;
    create: (payload: any) => any;
}