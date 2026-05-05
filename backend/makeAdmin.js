const pool = require('./db');

const makeAdmin = async (email) => {
    try {
        const result = await pool.query(
            "UPDATE users SET role = 'admin' WHERE email = $1 RETURNING *",
            [email]
        );

        if (result.rows.length === 0) {
            console.log(`User with email ${email} not found.`);
        } else {
            console.log(`Successfully promoted ${email} to admin!`);
            console.log(result.rows[0]);
        }
    } catch (err) {
        console.error("Error updating user:", err.message);
    } finally {
        process.exit();
    }
};

const emailArg = process.argv[2];

if (!emailArg) {
    console.log("Please provide an email. Usage: node makeAdmin.js <email>");
    process.exit();
}

makeAdmin(emailArg);
