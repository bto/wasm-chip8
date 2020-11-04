import * as React from "react";

const component: React.FC = () => (
    <div id="description">
        <div>
            Rustで実装したCHIP-8エミュレータをWASMで出力して、フロントをReact+Redux+Typescriptで実装しました。
        </div>
        <div>
            <a href="https://github.com/bto/wasm-chip8">ソースコード</a>
        </div>
        <div>
            キーボードレイアウト
            <table className="table">
                <tr>
                    <td>1(1)</td>
                    <td>2(2)</td>
                    <td>3(3)</td>
                    <td>4(C)</td>
                </tr>
                <tr>
                    <td>Q(4)</td>
                    <td>W(5)</td>
                    <td>E(6)</td>
                    <td>R(D)</td>
                </tr>
                <tr>
                    <td>A(7)</td>
                    <td>S(8)</td>
                    <td>D(9)</td>
                    <td>F(E)</td>
                </tr>
                <tr>
                    <td>Z(A)</td>
                    <td>X(0)</td>
                    <td>C(B)</td>
                    <td>V(F)</td>
                </tr>
            </table>
        </div>
    </div>
);

export default component;
