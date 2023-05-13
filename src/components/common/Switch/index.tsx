import React from 'react';
import { Input, Slider, SwitchLabel } from './Switch.style';

interface Props {
  onChange: (e: any) => void;
  defaultChecked?: boolean;
};

export default function Switch({
  onChange,
  defaultChecked=false,
}: Props) {
  return (
    <SwitchLabel>
      <Input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} />
      <Slider />
    </SwitchLabel>
  );
};
