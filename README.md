# Eip-7579 smart modular account for Dao’s Treasury

This project provides a decentralized application (DApp) for managing and automating treasury operations of a DAO using smart account. leveraging ERC-7579 to enable advanced trading features such as gasless transactions, scheduled transactions, leveraging Safe, The Graph, and other blockchain technologies to create a robust treasury management solution.

## Features

- **Gasless Transactions**: Powered by [Pimlico](https://pimlico.io), allowing users to execute transactions without worrying about gas fees.
- **Scheduled Transactions**: Implemented using the [Rhinestone](https://rhinestone.wtf) ERC-7579 module, enabling users to schedule transactions at a future time.
- **Swaps**: Support for token swaps using smart accounts.
- **Querying Blockchain Data**: Leverage The Graph for efficient data retrieval and state tracking.
- **Modular Architecture**: Built using Next.js, integrating various blockchain technologies into a seamless user experience.

## Technologies Used

- **Safe**: Manage treasury operations securely.
- **ERC-7579 (Smart Modular Account)**: Adopting standards for permissionless accounts.
- **Rhinestone & Pimlico**: Optimizing transaction bundling and gas management.
- **The Graph**: For decentralized querying of Ethereum data.
- **Next.js**: Server-side rendering and static generation for React applications.
- **GraphQL**: Data querying language used in conjunction with The Graph.

## Prerequisites

Before you start, ensure you have the following installed:

- Node.js (version 12.x or higher)
- npm or Yarn
- Git

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/0xPkhatri/munjo.git
cd your-repo-name
npm install # or yarn install
```

## Configuration

Create a `.env.local` file in the root directory and add the necessary environment variables:

```plaintext
NEXT_PUBLIC_PIMLICO_API_KEY=your_pimlico_api_key_here
NEXT_PUBLIC_PRIVATE_KEY=your_private_key_here
```

> **Note**: Do not expose your private keys in public repositories or client-side code in production.

## Running the Application

To start the development server, run:

```bash
npm run dev # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Load Safe**: Begin by initializing your smart contract client.
2. **Schedule Transfer/Orders**: Use the form provided to schedule transfer and buy or sell orders according to your specified criteria.
3. **View Transactions**: Check the status of scheduled and processed transactions on the main interface.

## Acknowledgments

- Thanks to [Pimlico](https://pimlico.io) for providing the gasless transaction infrastructure.
- Thanks to [Rhinestone](https://rhinestone.wtf) for the ERC-7579 module.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@0xPkhatri](https://twitter.com/oxPkhatri)

Project Link: [https://github.com/0xPkhatri/munjo](https://github.com/0xPkhatri/munjo)
