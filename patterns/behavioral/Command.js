// The Invoker class
class CommandInvoker {
    constructor() {
        this.history = [];
    }

    executeCommand(command) {
        command.execute();
        this.history.push(command);
    }

    undoLastCommand() {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}

// The Command interface (conceptual in JS)
class Command {
    execute() {
        throw new Error("Execute method must be implemented.");
    }
    undo() {
        throw new Error("Undo method must be implemented.");
    }
}

// Concrete Command for adding a product to the cart
class AddToCartCommand extends Command {
    constructor(cartService, product) {
        super();
        this.cartService = cartService;
        this.product = product;
    }

    execute() {
        console.log(`[Command] Executing: Add ${this.product.name} to cart.`);
        this.cartService.addProduct(this.product);
    }

    undo() {
        console.log(`[Command] Undo: Remove ${this.product.name} from cart.`);
        this.cartService.removeProduct(this.product.id);
    }
}

export { CommandInvoker, AddToCartCommand };
