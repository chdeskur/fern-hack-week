from typing import Optional

from src.settings import CONFIG
from src.types.embedding_model import EmbeddingModel


def get_tbuf_namespace(domain: str, embedding_model: EmbeddingModel = CONFIG.DEFAULT_EMBEDDING_MODEL) -> str:
    return f"{domain}_{embedding_model.model_name}_v2"
