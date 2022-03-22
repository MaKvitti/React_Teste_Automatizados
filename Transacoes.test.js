import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";
import Transacoes from "./Transacoes";

describe("Componente de transacao do extrato", () => {
  it("O snapshot do componente deve permanecer sempre o mesmo", () => {
    const { container } = render(
      <Transacao data="08/09/2020" tipo="saque" valor="20.00" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("O snapshot da lista deve permanecer sempre o mesmo", () => {
    const listaDeTransacoes = [
      {
        id: 1,
        tipo: "saque",
        valor: "30.00",
        data: "30/09/2020",
      },
      {
        id: 2,
        tipo: "deposito",
        valor: "40.00",
        data: "30/09/2020",
      }
    ];

    const { container } = render(<Transacoes transacoes={listaDeTransacoes} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
