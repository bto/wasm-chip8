import * as React from "react";
import { CContainer, CRow, CCol } from "@coreui/react";
import { Display } from "./";
import { Ram, Register } from "../containers";

const component: React.FC = () => (
    <CContainer fluid={true}>
        <CRow>
            <CCol>
                <Display />
            </CCol>
        </CRow>
        <CRow>
            <CCol md="6">
                <Ram />
            </CCol>
            <CCol md="6">
                <Register />
            </CCol>
        </CRow>
    </CContainer>
);

export default component;
