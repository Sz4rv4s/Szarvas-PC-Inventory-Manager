package hu.szarvas.backend.repository;

import hu.szarvas.backend.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartsRepository extends JpaRepository<Part, String> {
}
