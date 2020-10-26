import * as React from "react";
import { Props } from "../containers/Ram";

const component: React.FC<Props> = ({ pc, ram }: Props) => (
    <div>
        {pc + 0}: {ram[pc + 0]}
        <br />
        {pc + 1}: {ram[pc + 1]}
        <br />
        {pc + 2}: {ram[pc + 2]}
        <br />
        {pc + 3}: {ram[pc + 3]}
        <br />
        {pc + 4}: {ram[pc + 4]}
        <br />
        {pc + 5}: {ram[pc + 5]}
        <br />
        {pc + 6}: {ram[pc + 6]}
        <br />
        {pc + 7}: {ram[pc + 7]}
        <br />
        {pc + 8}: {ram[pc + 8]}
        <br />
        {pc + 9}: {ram[pc + 9]}
        <br />
    </div>
);

export default component;
