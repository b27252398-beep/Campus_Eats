package com.campuseats.service;

import com.campuseats.dto.PaymentIntentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        // Stripe.apiKey = stripeSecretKey; // Disable real Stripe init
    }

    public PaymentIntentResponse createPaymentIntent(Double amount, String orderId) throws StripeException {
        // Mock Stripe for hackathon
        long amountInCents = (long) (amount * 100);
        String fakeClientSecret = "pi_mocked_secret_" + System.currentTimeMillis();
        String fakeIntentId = "pi_mocked_" + System.currentTimeMillis();
        
        return new PaymentIntentResponse(
                fakeClientSecret,
                fakeIntentId,
                amountInCents);
    }

    public PaymentIntent retrievePaymentIntent(String paymentIntentId) throws StripeException {
        // Mock not strictly needed, but returning null or throwing if called
        return null;
    }

    public String getPaymentStatus(String paymentIntentId) throws StripeException {
        // Always return succeeded for mock payments
        return "succeeded";
    }
}
