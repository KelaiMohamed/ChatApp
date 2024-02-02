package ma.fstt.backend.Message;

import ma.fstt.backend.Contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE m.Sender = :username OR m.Receiver = :username")
    List<Message> getAllByUser(String username);

}
