import numpy as np
import pandas as pd

from sklearn.cluster import KMeans

from src.fai.api_models.insights import InsightApi
from src.fai.api_models.insights import InsightsApi
from src.fai.api_models.query import QueryApi
from src.fai.utils.insights.summarize_cluster import summarize_clusters_parallel
from src.settings import CONFIG
from src.settings import openai_client


def get_insights_from_queries(domain: str, queries: list[QueryApi]) -> InsightsApi:
    df = pd.DataFrame([{"text": query.text} for query in queries])
    df["embedding"] = get_embeddings(df["text"].tolist())
    df["cluster"], kmeans = cluster_embeddings(df["embedding"].tolist())

    top_cluster_ids = select_top_clusters(df, kmeans)
    summaries = summarize_clusters_parallel(domain, df, top_cluster_ids)

    insights = [
        InsightApi(
            insightText=summaries[cluster_id].insightText,
            numberOfQueries=len(df[df["cluster"] == cluster_id]),
            examples=summaries[cluster_id].examples,
        )
        for cluster_id in top_cluster_ids
    ]
    return InsightsApi(insights=insights)


def get_embeddings(texts: list[str]) -> list[list[float]]:
    embeddings = []
    for i in range(0, len(texts), CONFIG.EMBEDDING_BATCH_SIZE):
        batch = texts[i : i + CONFIG.EMBEDDING_BATCH_SIZE]
        response = openai_client.embeddings.create(model="text-embedding-3-large", input=batch)
        embeddings.extend([e.embedding for e in response.data])
    return embeddings


def cluster_embeddings(embeddings: list[list[float]]) -> tuple[np.ndarray, KMeans]:
    embedding_matrix = np.array(embeddings)
    kmeans = KMeans(n_clusters=CONFIG.INSIGHTS_NUM_CLUSTERS, random_state=42)
    clusters = kmeans.fit_predict(embedding_matrix)
    return clusters, kmeans


def select_top_clusters(df: pd.DataFrame, kmeans: KMeans) -> list[int]:
    cluster_stddevs = {}
    embedding_matrix = np.array(df["embedding"].tolist())

    for cluster_id in range(CONFIG.INSIGHTS_NUM_CLUSTERS):
        cluster_embeddings = embedding_matrix[df["cluster"] == cluster_id]
        centroid = kmeans.cluster_centers_[cluster_id]
        distances = np.linalg.norm(cluster_embeddings - centroid, axis=1)
        cluster_stddevs[cluster_id] = np.std(distances)

    sorted_clusters = sorted(cluster_stddevs.items(), key=lambda x: x[1])
    return [cluster_id for cluster_id, _ in sorted_clusters[: CONFIG.INSIGHTS_NUM_CLUSTERS]]
