import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const onMessageCreate = functions.database.ref('/rooms/{roomId}/messages/{messageId}')
.onCreate((snapshot, context) => {
    const roomId = context.params.roomId;
    const messageId = context.params.messageId;
    console.log(`New message ${messageId} in room ${roomId}`);

    const messageData = snapshot.val();
    const text = addPizzazz(messageData.text);
    return snapshot.ref.update({text: text});

})

function addPizzazz(text: string): string {
    return text.replace(/\bpizza\b/g,"🍕");
}