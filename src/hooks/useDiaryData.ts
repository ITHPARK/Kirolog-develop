import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getDiary } from '@remote/diary'

const useDiaryData = (): UseQueryResult<any, Error> => {
    return useQuery({
        queryKey: ['diary'],
        queryFn: () => getDiary(),
        retry: 1,
    })
}

export default useDiaryData
