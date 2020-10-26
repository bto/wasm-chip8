import * as React from "react";
import { Props } from "../containers/Register";

const component: React.FC<Props> = ({ i, sp, pc, v }: Props) => (
    <div>
        <div>v0: {v[0x0]}</div>
        <div>v1: {v[0x1]}</div>
        <div>v2: {v[0x2]}</div>
        <div>v3: {v[0x3]}</div>
        <div>v4: {v[0x4]}</div>
        <div>v5: {v[0x5]}</div>
        <div>v6: {v[0x6]}</div>
        <div>v7: {v[0x7]}</div>
        <div>v8: {v[0x8]}</div>
        <div>v9: {v[0x9]}</div>
        <div>va: {v[0xa]}</div>
        <div>vb: {v[0xb]}</div>
        <div>vc: {v[0xc]}</div>
        <div>vd: {v[0xd]}</div>
        <div>ve: {v[0xe]}</div>
        <div>vf: {v[0xf]}</div>
        <div>i: {i}</div>
        <div>sp: {sp}</div>
        <div>pc: {pc}</div>
    </div>
);

export default component;
