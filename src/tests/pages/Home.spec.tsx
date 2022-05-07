import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";

import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock("../../services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R$ 10,00" }} />);

    expect(screen.getByText(/R\$ 10,00/i)).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const retriveStripepricesMocked = mocked(stripe.prices.retrieve);

    retriveStripepricesMocked.mockResolvedValueOnce({
      //mockResolvedValueOnce é um mock que retorna uma promise
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        // objectContaining verifica se o objeto contem parte do objeto descrito
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
