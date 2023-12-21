import { dataSource as nextDataSource } from './next_source';

export const getBotMessage = async (multiplier?: number) => {
    return nextDataSource(multiplier)
}
