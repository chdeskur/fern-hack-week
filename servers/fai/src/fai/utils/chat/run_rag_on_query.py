from typing import List

from src.fai.utils.index.get_tbuf_namespace import get_docs_tbuf_namespace
from src.settings import CONFIG
from src.settings import openai_client
from src.settings import tbuf_client


def run_rag_on_query(query: str, domain: str) -> List[str]:
    vector = openai_client.embeddings.create(
        input=query,
        model=CONFIG.DEFAULT_EMBEDDING_MODEL.model_name,
    )
    namespace = get_docs_tbuf_namespace(domain)
    tbuf_ns = tbuf_client.namespace(namespace)
    query_results = tbuf_ns.query(
        rank_by=("vector", "ANN", vector.data[0].embedding),
        top_k=5,
        include_attributes=["document"],
    )
    return [result.document for result in query_results.rows]
