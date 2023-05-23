package com.example.paypal.controller;


import com.example.paypal.domain.Order;
import com.example.paypal.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@CrossOrigin
public class PaypalController {

    private final PaypalService service;

    @PostMapping("/order")
    public ResponseEntity<?> order(@RequestBody Order order) throws PayPalRESTException{
            Payment payment = service.createPayment(order.getPrice(), order.getCurrency(), order.getMethod(),
                    order.getIntent(), order.getDescription(), "http://localhost:4200/failed_purchase",
                    "http://localhost:4200/success");

            Optional<Links> approvalLinks = payment.getLinks().stream()
                    .filter(links -> links.getRel().equals("approval_url"))
                    .findFirst();

            if (approvalLinks.isEmpty())
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(approvalLinks.get(), HttpStatus.OK);
    }

    @PostMapping(value = "/pay")
    public ResponseEntity<String> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) throws PayPalRESTException {
        Payment payment = service.executePayment(paymentId, payerId);
        System.out.println(payment.toJSON());
        if (payment.getState().equals("approved")) {
            return new ResponseEntity<>("pagado", HttpStatus.OK);
        }
        return new ResponseEntity<>("falló", HttpStatus.NO_CONTENT);
    }

}
