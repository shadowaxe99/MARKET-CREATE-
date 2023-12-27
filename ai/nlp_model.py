```python
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Embedding, LSTM, Dense, Bidirectional
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

class NLPModel:
    def __init__(self, max_features=20000, max_sequence_length=100, embedding_size=128, lstm_units=64):
        self.max_features = max_features
        self.max_sequence_length = max_sequence_length
        self.embedding_size = embedding_size
        self.lstm_units = lstm_units
        self.tokenizer = Tokenizer(num_words=self.max_features)
        self.model = self._build_model()

    def _build_model(self):
        inputs = Input(shape=(self.max_sequence_length,))
        x = Embedding(self.max_features, self.embedding_size)(inputs)
        x = Bidirectional(LSTM(self.lstm_units, return_sequences=True))(x)
        x = Bidirectional(LSTM(self.lstm_units))(x)
        outputs = Dense(1, activation='sigmoid')(x)

        model = Model(inputs=inputs, outputs=outputs)
        model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        return model

    def train(self, texts, labels, batch_size=32, epochs=10, validation_split=0.2):
        self.tokenizer.fit_on_texts(texts)
        sequences = self.tokenizer.texts_to_sequences(texts)
        padded_sequences = pad_sequences(sequences, maxlen=self.max_sequence_length)

        callbacks = [
            EarlyStopping(monitor='val_loss', patience=2),
            ModelCheckpoint(filepath='nlp_model.h5', monitor='val_loss', save_best_only=True)
        ]

        self.model.fit(padded_sequences, np.array(labels), batch_size=batch_size, epochs=epochs,
                       validation_split=validation_split, callbacks=callbacks)

    def predict(self, text):
        sequence = self.tokenizer.texts_to_sequences([text])
        padded_sequence = pad_sequences(sequence, maxlen=self.max_sequence_length)
        return self.model.predict(padded_sequence)[0][0]

    def load_model(self, model_path):
        if os.path.exists(model_path):
            self.model.load_weights(model_path)
        else:
            raise FileNotFoundError(f"The specified model path {model_path} does not exist.")

    def save_tokenizer(self, tokenizer_path='tokenizer.json'):
        tokenizer_json = self.tokenizer.to_json()
        with open(tokenizer_path, 'w', encoding='utf-8') as f:
            f.write(tokenizer_json)

    def load_tokenizer(self, tokenizer_path):
        with open(tokenizer_path, 'r', encoding='utf-8') as f:
            tokenizer_data = f.read()
            self.tokenizer = tokenizer_from_json(tokenizer_data)

# Example usage:
# nlp_model = NLPModel()
# nlp_model.train(texts=train_texts, labels=train_labels)
# prediction = nlp_model.predict("Sample text to predict")
# nlp_model.save_tokenizer()
# nlp_model.load_tokenizer('tokenizer.json')
# nlp_model.load_model('nlp_model.h5')
```