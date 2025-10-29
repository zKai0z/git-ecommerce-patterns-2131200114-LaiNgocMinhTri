import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        console.log('--- Checkout Process Started ---');

        const inStock = this.inventoryService.checkStock(orderDetails.productIds);
        if (!inStock) {
            console.log('[Checkout] Order failed: Some items are out of stock.');
            return;
        }

        const paymentSuccess = this.paymentService.processPayment(orderDetails.userId, orderDetails.totalAmount);
        if (!paymentSuccess) {
            console.log('[Checkout] Order failed: Payment was unsuccessful.');
            return;
        }

        const shippingResult = this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);
        console.log(`[Checkout] Shipping arranged successfully. Tracking ID: ${shippingResult.trackingId}`);

        console.log('--- Checkout Process Completed Successfully ---');
        return shippingResult;
    }
}

export { CheckoutFacade };
