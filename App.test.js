import App, { calcularNovoSaldo } from "./app";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Componente principal", () => {
  describe("Quando eu abro o app do banco ", () => {
    it("o nome é exibido", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });
    it(" o saldo é exibido", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    it("o botão de realizar operação é exibido", () => {
      render(<App />);
      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  //Funcoes
  describe("Quando eu realizo uma transação ", () => {
    it("que é um saque, o calor vai diminuir", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };

      const novoSaldo = calcularNovoSaldo(valores, 150);

      //Valor que resultara na função
      expect(novoSaldo).toBe(100);
    });
    it("que é um deposito, o calor vai aumentar", () => {
      const valores = {
        transacao: "deposito",
        valor: 200,
      };

      const novoSaldo = calcularNovoSaldo(valores, 150);

      //Valor que resultara na função
      expect(novoSaldo).toBe(350);
    });
    it("que é um saque, a transacao deve ser realizada", () => {
      render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTrasacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: 'saque' } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTrasacao);

      expect(saldo.textContent).toBe("R$ 990");
    });
  });
});
