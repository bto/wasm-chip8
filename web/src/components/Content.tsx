import * as React from "react";
import { CContainer, CRow, CCol } from "@coreui/react";
import { Display, Ram, Register } from "../containers";

const component: React.FC = () => (
    <CContainer fluid={true}>
        <CRow>
            <CCol lg="5" className="mx-auto">
                <Display />
            </CCol>
            <CCol md="4">
                <Ram />
            </CCol>
            <CCol sm="3">
                <Register />
            </CCol>
        </CRow>
    </CContainer>
);

export default component;
