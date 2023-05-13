import styled from '@emotion/styled';
import { color } from 'src/components/styles/common.style';

export const SwitchLabel = styled('label')`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

export const Input = styled('input')`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }
`;

export const Slider = styled('span')`
  position: absolute;
  cursor: pointer;
  top: 3px;
  left: 0;
  right: 0;
  bottom: 3px;
  background-color: #FFFFFF78;
  border-radius: 99px;
  -webkit-transition: .2s;
  transition: .2s;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 0px;
    top: -3px;
    background-color: ${color.primary.main};
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 1px rgba(0, 0, 0, 0.16);
    border-radius: 50%;
    -webkit-transition: .2s;
    transition: .2s;
  }
`;
