import React, { FC } from 'react';
import { Select } from '@chakra-ui/react';

type props = {
  setSelectChunk: React.Dispatch<React.SetStateAction<number>>;
  limit: number[];
}
const ChooseChunkFromScans : FC<props> = ({ setSelectChunk, limit }) => {
  const onSelectChunk = (e: any) => {
    if (!e.target.value) setSelectChunk(0);
    else setSelectChunk(e.target.value);
  };
  return (
    <Select mt="1rem" placeholder="Select the portion of the test you are willing to view" onChange={onSelectChunk}>
      {
        limit.map((item) => (
          <option key={item} value={item}>
            select portion number-
            {item}
          </option>
        ))
      }

    </Select>
  );
};

export default ChooseChunkFromScans;
