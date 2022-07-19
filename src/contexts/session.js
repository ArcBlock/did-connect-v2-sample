import { createAuthServiceSessionContext } from '@did-connect/react/Session';

const { SessionProvider, SessionConsumer, useSessionContext } = createAuthServiceSessionContext();

export { SessionProvider, SessionConsumer, useSessionContext };
