import { container } from "tsyringe";

import { IAddressProvider } from "./addressProvider/IAddressProvider";
import { AddressProvider } from "./addressProvider/implementations/AddressProvider";

container.registerSingleton<IAddressProvider>(
    "AddressProvider",
    AddressProvider
);
