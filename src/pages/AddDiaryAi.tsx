import React, { useState } from 'react'
import TagCategory from '@/components/diary/TagCategory'

const AddDiaryAi = () => {
    const [first, setfirst] = useState<string>('')
    return (
        <div>
            <TagCategory onSubmit={setfirst} />
        </div>
    )
}

export default AddDiaryAi
