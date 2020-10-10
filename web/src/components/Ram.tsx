import * as React from "react";

type Props = {
    pc: number;
    ram: number[];
};

const component: React.FC<Props> = (props: Props) => (
    <div>
        {props.pc + 0}: {props.ram[props.pc + 0]}
        {props.pc + 1}: {props.ram[props.pc + 1]}
        {props.pc + 2}: {props.ram[props.pc + 2]}
        {props.pc + 3}: {props.ram[props.pc + 3]}
        {props.pc + 4}: {props.ram[props.pc + 4]}
        {props.pc + 5}: {props.ram[props.pc + 5]}
        {props.pc + 6}: {props.ram[props.pc + 6]}
        {props.pc + 7}: {props.ram[props.pc + 7]}
        {props.pc + 8}: {props.ram[props.pc + 8]}
        {props.pc + 9}: {props.ram[props.pc + 9]}
    </div>
);

export default component;
