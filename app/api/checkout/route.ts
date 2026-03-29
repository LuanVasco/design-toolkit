import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planName, cycle } = await req.json();

    // 1. Definimos o valor base do plano
    const isYearly = cycle === "yearly";
    const basePrice = planName === "Pro" ? 47 : 147;
    
    // Calcula o desconto de 25% para o plano anual
    const finalPrice = isYearly ? (basePrice * 12) * 0.75 : basePrice;

    // 2. Montamos o Payload para a API do Asaas
    // Documentação: https://docs.asaas.com/reference/criar-um-link-de-pagamento
    const asaasPayload = {
      name: `DesignGen OS - Plano ${planName} (${isYearly ? "Anual" : "Mensal"})`,
      description: "Acesso à engine Z-Axis de motion design e exportações de alta performance.",
      endDate: null, // Link não expira
      value: finalPrice,
      billingType: "UNDEFINED", // Permite que o cliente escolha PIX, Boleto ou Cartão na tela
      chargeType: isYearly ? "INSTALLMENT" : "RECURRING", // Anual parcelado ou Mensal recorrente
      maxInstallmentCount: isYearly ? 12 : 1,
      dueDateLimitDays: 3,
    };

    // 3. Chamada HTTP para a API do Asaas (Usando Sandbox para desenvolvimento)
    const ASAAS_API_URL = "https://sandbox.asaas.com/api/v3/paymentLinks";
    const ASAAS_API_KEY = process.env.ASAAS_ACCESS_TOKEN; // Adicione isso no seu .env.local

    const response = await fetch(ASAAS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": `\$${ASAAS_API_KEY}`,
      },
      body: JSON.stringify(asaasPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.description || "Erro ao conectar com o Asaas");
    }

    // 4. Devolvemos a URL de pagamento gerada para o Front-end
    return NextResponse.json({ url: data.url });

  } catch (error: any) {
    console.error("Erro na API de Checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}