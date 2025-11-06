// Simple test suite
const http = require('http');

let testsPassed = 0;
let testsFailed = 0;

function test(description, fn) {
    try {
        fn();
        testsPassed++;
        console.log(`✅ PASS: ${description}`);
    } catch (error) {
        testsFailed++;
        console.log(`❌ FAIL: ${description}`);
        console.log(`   Error: ${error.message}`);
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
}

// Start server for testing
const { server } = require('./server.js');

// Give server time to start
setTimeout(() => {
    console.log('\n🧪 Running tests...\n');

    // Test 1: Server health check
    http.get('http://localhost:3000/health', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            test('Health check endpoint returns 200', () => {
                assertEqual(res.statusCode, 200, 'Health check should return 200');
            });

            test('Health check returns valid JSON', () => {
                const json = JSON.parse(data);
                assertEqual(json.status, 'healthy', 'Status should be healthy');
            });
        });
    });

    // Test 2: API info endpoint
    http.get('http://localhost:3000/api/info', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            test('API info endpoint returns 200', () => {
                assertEqual(res.statusCode, 200, 'API info should return 200');
            });

            test('API info returns valid structure', () => {
                const json = JSON.parse(data);
                assertEqual(typeof json.name, 'string', 'Should have name field');
                assertEqual(Array.isArray(json.features), true, 'Should have features array');
            });
        });
    });

    // Test 3: Main page
    http.get('http://localhost:3000/', (res) => {
        test('Main page returns 200', () => {
            assertEqual(res.statusCode, 200, 'Main page should return 200');
        });

        // Wait for all tests to complete
        setTimeout(() => {
            console.log('\n📊 Test Results:');
            console.log(`   Passed: ${testsPassed}`);
            console.log(`   Failed: ${testsFailed}`);
            console.log(`   Total: ${testsPassed + testsFailed}\n`);

            server.close();
            process.exit(testsFailed > 0 ? 1 : 0);
        }, 1000);
    });
}, 500);
