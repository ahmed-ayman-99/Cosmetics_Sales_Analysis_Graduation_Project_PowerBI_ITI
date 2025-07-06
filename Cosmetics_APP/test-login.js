// Test login functionality
const bcrypt = require('bcryptjs');

// Test credentials
const testEmail = 'mona.rizk225@gmail.com';
const testPassword = '12345678';

// Hash the password to verify it matches what's in the database
async function testPasswordHash() {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        console.log('Hashed password for testing:', hashedPassword);
        
        // Test if the password matches the stored hash
        const storedHash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
        const isMatch = await bcrypt.compare(testPassword, storedHash);
        
        console.log('Password match test:', isMatch ? '✅ PASS' : '❌ FAIL');
        
        if (isMatch) {
            console.log('✅ Login credentials are ready for testing!');
            console.log('📧 Email:', testEmail);
            console.log('🔑 Password:', testPassword);
            console.log('\n📋 Test Steps:');
            console.log('1. Start your server: npm run dev');
            console.log('2. Go to: http://localhost:3000/login.html');
            console.log('3. Enter the email and password above');
            console.log('4. Click "Sign In"');
            console.log('5. You should be redirected to the home page');
        } else {
            console.log('❌ Password hash mismatch. Please check the database setup.');
        }
        
    } catch (error) {
        console.error('Error testing password hash:', error);
    }
}

testPasswordHash(); 