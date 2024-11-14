package hu.szarvas.backend.service;

import hu.szarvas.backend.dto.PartDTO;
import hu.szarvas.backend.dto.PartWithWarehouseDTO;
import hu.szarvas.backend.dto.UpdatePartDTO;
import hu.szarvas.backend.dto.WarehouseDTO;
import hu.szarvas.backend.model.Part;
import hu.szarvas.backend.model.Warehouse;
import hu.szarvas.backend.repository.PartsRepository;
import hu.szarvas.backend.repository.WarehousesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartsService {
    private final PartsRepository partsRepository;

    private final WarehousesRepository warehousesRepository;

    public PartsService(PartsRepository partsRepository, WarehousesRepository warehousesRepository) {
        this.partsRepository = partsRepository;
        this.warehousesRepository = warehousesRepository;
    }

    public List<PartDTO> getAllParts() {
        return partsRepository.findAll().stream()
                .map(this::convertToPartDTO)
                .collect(Collectors.toList());
    }

    public List<PartWithWarehouseDTO> getAllPartsWithWarehouse() {
        return partsRepository.findAll().stream()
                .map(this::convertToPartWithWarehouseDTO)
                .collect(Collectors.toList());
    }

    public PartDTO getPartById(Integer id) {
        return partsRepository.findById(id)
                .map(this::convertToPartDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
    }

    public List<PartDTO> searchPartsByModel(String model) {
        return partsRepository.findByModelContainingIgnoreCase(model).stream()
                .map(this::convertToPartDTO)
                .collect(Collectors.toList());
    }

    public void addPart(PartDTO partDTO, Integer warehouseId) {
        Warehouse warehouse = warehousesRepository.findById(warehouseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Warehouse not found"));

        Part part = new Part();
        part.setId(partDTO.getId());
        part.setModel(partDTO.getModel());
        part.setBrand(partDTO.getBrand());
        part.setPrice(partDTO.getPrice());
        part.setWarehouse(warehouse);

        Part savedPart = partsRepository.save(part);

        convertToPartDTO(savedPart);
    }

    public void deletePart(Integer id) {
        Part part = partsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        partsRepository.delete(part);
    }

    public void updatePartPrice(Integer id, int newPrice) {
        Part part = partsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        part.setPrice(newPrice);
        partsRepository.save(part);
    }

    public void updatePart(Integer id, UpdatePartDTO updatePartDTO) {
        Part part = partsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        part.setModel(updatePartDTO.getModel());
        part.setBrand(updatePartDTO.getBrand());
        part.setPrice(updatePartDTO.getPrice());

        Warehouse warehouse = warehousesRepository.findById(updatePartDTO.getWarehouseId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Warehouse not found"));
        part.setWarehouse(warehouse);

        partsRepository.save(part);
    }

    private PartDTO convertToPartDTO(Part part) {
        return new PartDTO(
                part.getId(),
                part.getModel(),
                part.getBrand(),
                part.getPrice()
        );
    }

    private PartWithWarehouseDTO convertToPartWithWarehouseDTO(Part part) {
        WarehouseDTO warehouseDTO = new WarehouseDTO(
                part.getWarehouse().getId(),
                part.getWarehouse().getName(),
                part.getWarehouse().getCity(),
                part.getWarehouse().getAddress(),
                part.getWarehouse().getCapacity()
        );

        return new PartWithWarehouseDTO(
                part.getId(),
                part.getModel(),
                part.getBrand(),
                part.getPrice(),
                warehouseDTO
        );
    }
}
