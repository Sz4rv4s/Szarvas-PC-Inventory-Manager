package hu.szarvas.backend.repository;

import hu.szarvas.backend.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartsRepository extends JpaRepository<Part, Integer> {
    List<Part> findByModelContainingIgnoreCase(final String name);
}
