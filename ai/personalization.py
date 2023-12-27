```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

class PersonalizationEngine:
    def __init__(self):
        # Initialize the vectorizer and any other required variables
        self.vectorizer = TfidfVectorizer()
        self.user_profiles = {}  # Dictionary to store user profile vectors
        self.content_vectors = {}  # Dictionary to store content vectors

    def create_user_profile(self, user_id: str, user_data: List[str]):
        """
        Create a user profile based on the user's historical data.
        :param user_id: Unique identifier for the user.
        :param user_data: List of strings representing the user's preferences or historical data.
        """
        user_tfidf = self.vectorizer.fit_transform(user_data)
        user_profile_vector = np.mean(user_tfidf.toarray(), axis=0)
        self.user_profiles[user_id] = user_profile_vector

    def add_content(self, content_id: str, content_data: str):
        """
        Add content to the engine to be used for recommendations.
        :param content_id: Unique identifier for the content.
        :param content_data: String representing the content.
        """
        content_tfidf = self.vectorizer.transform([content_data])
        self.content_vectors[content_id] = content_tfidf.toarray()[0]

    def recommend_content(self, user_id: str) -> List[str]:
        """
        Recommend content to a user based on their profile.
        :param user_id: Unique identifier for the user.
        :return: List of content IDs recommended for the user.
        """
        user_profile = self.user_profiles.get(user_id)
        if user_profile is None:
            return []

        # Calculate similarity scores between user profile and content
        similarities = {}
        for content_id, content_vector in self.content_vectors.items():
            similarity = cosine_similarity([user_profile], [content_vector])
            similarities[content_id] = similarity[0][0]

        # Sort content by similarity score in descending order
        recommended_content_ids = sorted(similarities, key=similarities.get, reverse=True)
        return recommended_content_ids

    def update_user_profile(self, user_id: str, new_user_data: List[str]):
        """
        Update the user profile with new data.
        :param user_id: Unique identifier for the user.
        :param new_user_data: List of strings with new data to update the user's profile.
        """
        if user_id not in self.user_profiles:
            self.create_user_profile(user_id, new_user_data)
        else:
            updated_data = self.vectorizer.transform(new_user_data)
            updated_profile_vector = np.mean(np.vstack((self.user_profiles[user_id], updated_data.toarray())), axis=0)
            self.user_profiles[user_id] = updated_profile_vector

# Example usage:
# personalization_engine = PersonalizationEngine()
# personalization_engine.create_user_profile('user123', ['action movies', 'sci-fi novels', 'video games'])
# personalization_engine.add_content('content456', 'An exciting action movie with a sci-fi twist.')
# recommendations = personalization_engine.recommend_content('user123')
# print(recommendations)
```