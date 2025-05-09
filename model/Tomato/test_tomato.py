import os
import sys
import io
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# Suppress TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Set the encoding for stdout to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load the saved model
model = tf.keras.models.load_model('tomato_model.h5')

# Get the image path from command-line arguments
img_path = sys.argv[1]

# Load and preprocess the image
img = image.load_img(img_path, target_size=(256, 256))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0

# Make a prediction
predictions = model.predict(img_array, verbose = 0)

# Get the predicted class
predicted_class = np.argmax(predictions, axis=1)

# Map the predicted class to the corresponding label
class_labels = ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
                'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
                'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
                'Tomato___healthy']

# Get and print the actual class label (no cleaning)
predicted_label = class_labels[predicted_class[0]]

# Clean and print
def clean_output(output):
    return output.split('___')[-1].replace('_', ' ')

print(clean_output(predicted_label))