import * as React from "react";

type Props = {
    i: number;
    pc: number;
    sp: number;
    v: number[];
};

const component: React.FC<Props> = (props: Props) => (
    <div>
        <div>v0: {props.v[0x0]}</div>
        <div>v1: {props.v[0x1]}</div>
        <div>v2: {props.v[0x2]}</div>
        <div>v3: {props.v[0x3]}</div>
        <div>v4: {props.v[0x4]}</div>
        <div>v5: {props.v[0x5]}</div>
        <div>v6: {props.v[0x6]}</div>
        <div>v7: {props.v[0x7]}</div>
        <div>v8: {props.v[0x8]}</div>
        <div>v9: {props.v[0x9]}</div>
        <div>va: {props.v[0xa]}</div>
        <div>vb: {props.v[0xb]}</div>
        <div>vc: {props.v[0xc]}</div>
        <div>vd: {props.v[0xd]}</div>
        <div>ve: {props.v[0xe]}</div>
        <div>vf: {props.v[0xf]}</div>
        <div>i: {props.i}</div>
        <div>sp: {props.sp}</div>
        <div>pc: {props.pc}</div>
    </div>
);

export default component;
