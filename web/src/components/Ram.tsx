import * as React from "react";

type Props = {
    pc: number;
    ram: number[];
};

const component: React.FC<Props> = (props: Props) => (
    <div>
        {props.pc + 0}: {props.ram[props.pc + 0]}
        <br />
        {props.pc + 1}: {props.ram[props.pc + 1]}
        <br />
        {props.pc + 2}: {props.ram[props.pc + 2]}
        <br />
        {props.pc + 3}: {props.ram[props.pc + 3]}
        <br />
        {props.pc + 4}: {props.ram[props.pc + 4]}
        <br />
        {props.pc + 5}: {props.ram[props.pc + 5]}
        <br />
        {props.pc + 6}: {props.ram[props.pc + 6]}
        <br />
        {props.pc + 7}: {props.ram[props.pc + 7]}
        <br />
        {props.pc + 8}: {props.ram[props.pc + 8]}
        <br />
        {props.pc + 9}: {props.ram[props.pc + 9]}
        <br />
    </div>
);

export default component;
