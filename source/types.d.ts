declare module '*.module.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.css';

// Add Disposable interface for @vitest/spy compatibility
interface Disposable {
    dispose(): void;
}
