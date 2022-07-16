import { useState } from 'react';
import { Connect, Button } from '@did-connect/react';
import useLocalStorage from 'react-use/lib/useLocalStorage';

function Home() {
  const [open, setOpen] = useState(false);
  const [connectedUser, setConnectedUser] = useLocalStorage('connectedUser', null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleApprove = (ctx, e) => {
    console.log('onApprove', ctx, e);
  };
  const handleComplete = (ctx) => {
    setConnectedUser(ctx.currentConnected);
    setOpen(false);
  };

  return (
    <header className="app-header">
      {!connectedUser && (
        <Button type="button" variant="contained" size="large" onClick={() => setOpen(true)}>
          Continue With
        </Button>
      )}
      {connectedUser && (
        <div style={{ textAlign: 'left' }}>
          Connected: <pre>{JSON.stringify(connectedUser, null, 2)}</pre>
          <button type="button" onClick={() => setConnectedUser(null)}>
            Switch User
          </button>
        </div>
      )}
      <Connect
        popup
        open={open}
        onlyConnect
        onClose={handleClose}
        onConnect={[]}
        onApprove={handleApprove}
        onComplete={handleComplete}
        messages={{
          title: 'Connect DID Wallet',
          scan: 'You will always see the app connection screen on DID Wallet when scan follow qrcode',
          confirm: 'Confirm operation on your DID Wallet',
          success: 'You have successfully connected!',
        }}
        relayUrl="/.well-known/service/api/connect/relay"
      />
    </header>
  );
}

export default Home;
