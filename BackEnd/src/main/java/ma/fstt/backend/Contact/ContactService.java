package ma.fstt.backend.Contact;


import java.util.List;

public interface ContactService {

    Contact save(Contact contact) throws Exception;

    Contact update(Contact contact) throws Exception;

    void delete(Long id) throws Exception;

    Contact getOne(Long id) throws Exception;

    boolean existsById(Long id);

    List<Contact> getAllByUser(Long user_id) throws Exception;
}
