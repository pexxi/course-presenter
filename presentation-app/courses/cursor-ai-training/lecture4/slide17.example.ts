// ❌ Common TypeScript Mistakes

// 1. Using 'any' type
type user_profile = {  // ❌ snake_case for type
    id: string;
    first_name: string;  // ❌ snake_case
    last_name: string;
}

// 2. Implicit any
function processUserBad(user: any) {  // ❌ Using any type
    return user.process();
}

// 3. Overusing type assertions
interface UserData {
    name: string;
}
const dataBad = {} as UserData;  // ❌ Unsafe assertion
dataBad.name = 'John';  // No type checking

// 4. Empty interfaces
interface Config { }  // ❌ Empty interface

// 5. Non-null assertion operator overuse
document.getElementById('button')!.click();  // ❌ Unsafe

// ✅ Better Alternatives

// 1. Use proper casing and types
interface UserProfile {
    id: string;
    firstName: string;  // ✅ camelCase
    lastName: string;
    process?: () => void;
}

// 2. Always type parameters
function processUserGood(user: UserProfile): void {
    user.process?.();
}

// 3. Initialize with proper typing
const dataGood: Partial<UserData> = {};  // ✅ Type-safe

// 4. Use type when possible
type FeatureFlag = {
    enabled: boolean;
    description: string;
}

// 5. Proper null checking
function handleClick() {
    console.log('Button clicked');
}

const button = document.getElementById('button');
button?.addEventListener('click', handleClick);  // ✅ Safe 