# FinTracker - Expense Management Bot

This Discord bot allows you to manage your personal and group expenses efficiently. You can use it to register, add, retrieve, and summarize expenses. It also supports splitting expenses among group members.

## Features

- **Individual Expense Management:** Manage your personal expenses easily.
- **Group Expense Management:** Collaborate with friends to manage group expenses, split expenses evenly, and see summaries.
- **Commands:**
  - `register`: Register yourself with the bot.
  - `add-expense`: Add an expense to the database.
  - `retrieve-expenses`: Retrieve all your expenses.
  - `summary`: Retrieve a summary of expenses, credits, and debits.
  - `split-expenses`: Split expenses among group members (only in group mode).

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- Discord account and server

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/discord-expense-bot.git
    cd discord-expense-bot
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following variables:
    ```env
    DISCORD_TOKEN=your_discord_bot_token
    DISCORD_CLIENT_ID=your_discord_client_id
    MONGODB_URI=your_mongo_db_uri
    ```

4. Register the bot commands:
    ```bash
    node command.js
    ```

5. Start the bot:
    ```bash
    node index.js
    ```

## Usage

### Individual Mode

In individual mode, you can manage your personal expenses privately. Here's how you can use the commands:

1. **Register:**
    ```bash
    /register username:<your_username> password:<your_password>
    ```
    ![Screenshot from 2024-07-09 17-40-41](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/91679c44-0176-49bd-8ca1-3a0f3df4a908)

2. **Add Expense:**
    ```bash
    /add-expense category:<category> amount:<amount> description:<description> type:<credit|debit>
    ```
    ![Screenshot from 2024-07-09 17-34-50](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/02d45f41-0976-4818-a92a-06bcce49a4df)
    ![Screenshot from 2024-07-09 17-34-58](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/47f25f9b-34d4-47ce-9446-6657c18fd99f)

4. **Retrieve Expenses:**
    ```bash
    /retrieve-expenses
    ```
    ![Screenshot from 2024-07-09 17-36-47](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/a801a6e6-5e46-4d35-807c-29fd39aa5d6f)

5. **Summary:**
    ```bash
    /summary month:<month>
    ```
    ![Screenshot from 2024-07-09 17-48-18](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/8a140dad-faf2-4c6b-8919-fc1889de1311)

### Group Mode

In group mode, you can manage shared expenses with friends. To use group mode, follow these steps:

1. **Register with Group ID:**
    ```bash
    /register username:<your_username> password:<your_password> groupid:<your_group_id>
    ```
    ![Screenshot from 2024-07-09 17-23-31](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/0ccff9b3-d6f7-4143-bff0-bc871a98b2d5)
    ![Screenshot from 2024-07-09 17-25-13](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/02bb431e-fc88-46e8-828e-f05373b61641)

3. **Add Expense:**
    ```bash
    /add-expense category:<category> amount:<amount> description:<description> type:<credit|debit>
    ```
    ![Screenshot from 2024-07-09 17-25-50](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/a55f9f48-6ea3-4a21-8a0e-5629f4f93afd)
    ![Screenshot from 2024-07-09 17-26-38](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/5af2632d-abee-4d78-86cc-2066f7f6bf1e)

5. **Retrieve Expenses:**
    ```bash
    /retrieve-expenses
    ```
    ![Screenshot from 2024-07-09 17-26-54](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/dec564f2-dc9d-4015-92bf-33635cf778c0)
    ![Screenshot from 2024-07-09 17-27-19](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/8fcc62ab-83ba-47e9-9b7e-9b5f5f619728)

7. **Summary:**
    ```bash
    /summary month:<month>
    ```
    !![Screenshot from 2024-07-09 17-28-54](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/064c1759-d8b4-4cf6-a507-80bbbed69f4e)
    ![Screenshot from 2024-07-09 17-29-21](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/ea004d04-cb98-4179-8384-8b035731cd9b)

9. **Split Expenses:**
    ```bash
    /split-expenses
    ```
    ![Screenshot from 2024-07-09 17-29-43](https://github.com/ItsJupiter000/FinTrackerBot/assets/120741895/eb265516-e73b-428d-a779-180fc6fef7fb)

## Command Explanations

### `/register`

Registers a user to the database.
- **Options:**
  - `username`: The username of the user (required).
  - `password`: The password of the user (required).
  - `groupid`: The group ID of the user (optional for individual mode).

### `/add-expense`

Adds an expense to the database.
- **Options:**
  - `category`: The category of the expense (required).
  - `amount`: The amount of the expense (required).
  - `description`: The description of the expense (required).
  - `type`: The type of the expense (`credit` or `debit`, optional).

### `/retrieve-expenses`

Retrieves all expenses for the user.

### `/summary`

Retrieves a summary of expenses, credits, and debits.
- **Options:**
  - `month`: The month to retrieve the summary for (required).

### `/split-expenses` (Group Mode Only)

Splits the expenses among users in equal amounts based on the group ID.

## Future Implementations

1. **Generate PDF of Monthly Expenses**: Allow users to generate a PDF report of monthly expenses.
2. **Notifications**: Send notifications for events like user joins or command executions.
3. **Expense Categories Management**: Enable users to manage (add/edit/delete) expense categories.
4. **Budget Management**: Set budgets for categories and receive alerts when approaching/exceeding them.
5. **Detailed Analytics**: Provide detailed analytics and visualizations of expenses.
6. **Multi-Currency Support**: Support adding expenses in different currencies with conversion to a base currency.
7. **Custom Reminders**: Set custom reminders for financial tasks.

## Contributing

Contributions are welcome!

