import { dataSource as nextDataSource } from './next_source';

export const getBotMessage = async () => {
    return nextDataSource()
}