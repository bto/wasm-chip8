import * as React from "react";
import { Props } from "../containers/Ram";

const component: React.FC<Props> = ({ mod, pc, ram }: Props) => (
    <div>
        {mod.toAddr(pc + 0)}: {ram[pc + 0]}
        <br />
        {mod.toAddr(pc + 1)}: {ram[pc + 1]}
        <br />
        {mod.toAddr(pc + 2)}: {ram[pc + 2]}
        <br />
        {mod.toAddr(pc + 3)}: {ram[pc + 3]}
        <br />
        {mod.toAddr(pc + 4)}: {ram[pc + 4]}
        <br />
        {mod.toAddr(pc + 5)}: {ram[pc + 5]}
        <br />
        {mod.toAddr(pc + 6)}: {ram[pc + 6]}
        <br />
        {mod.toAddr(pc + 7)}: {ram[pc + 7]}
        <br />
        {mod.toAddr(pc + 8)}: {ram[pc + 8]}
        <br />
        {mod.toAddr(pc + 9)}: {ram[pc + 9]}
        <br />
    </div>
);

export default component;
